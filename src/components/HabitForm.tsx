import { useHabits } from "../context/useHabits";
import { Button } from "./Button";
import { useState, type SubmitEvent } from "react";

export function HabitForm() {
    const [habitName, setHabitName] = useState("");
    const { addHabit } = useHabits()

    function handleSubmit(e: SubmitEvent){
        e.preventDefault();

        if (habitName.trim() === "") return;
        addHabit(habitName);
        setHabitName("");
    }

    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input 
            name="habit"
            value={habitName} 
            onChange={e => setHabitName(e.target.value)}
            className="flex-1 rounded bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500" 
            placeholder="New Habit..."/>
            <Button 
                type="submit"
                className="rounded-lg px-4 py-2 font-medium"
                disabled={habitName.trim() === ''}
                >
                Add Habit
            </Button>
        </form>
    )
}
