import { type ReactNode } from "react"
import { isSameDay } from "date-fns"
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = {
    children: ReactNode
}

export function HabitProvider({ children }: HabitProviderProps){
    const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);
    
    function addHabit(name: string){
        setHabits(curr => [...curr, {id: crypto.randomUUID(), name, completions: []}]);
    }

    function deleteHabit(id: string){
        setHabits(curr => curr.filter(habit => habit.id !== id));
    }

    function toggleHabit(id: string, date: Date){
        setHabits(curr => 
            curr.map(habit => {
            // if the id is not matching, don't do anything 
            if (habit.id !== id) return habit 

            // has the habit been completed on this date already?
            const alreadyDone = habit.completions.some(c => isSameDay(c, date))
            
            // check the completions array: if done, filter out that is not the same day, 
            // if not done, add the date to the completions array 
            const completions = alreadyDone
                ? habit.completions.filter (c => !isSameDay(c, date))
                : [...habit.completions, date]

            // return a new habit object with the updated completions array
            return {...habit, completions}
            })
        )
    }

    return (
        <HabitContext value={{habits, addHabit, toggleHabit, deleteHabit}}>
            {children}
        </HabitContext>
    )
}