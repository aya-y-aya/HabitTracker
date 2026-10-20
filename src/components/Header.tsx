import { useHabits } from "../context/useHabits";
import { Button } from "./Button";
import { format, isToday } from "date-fns"

type HeaderProps = {
  visibleDates: Date[]
  onPrev: () => void
  onNext: () => void
}

export function Header({visibleDates, onPrev, onNext} : HeaderProps) {
    const { habits } = useHabits()

    const doneToday = habits.filter(habits => 
      habits.completions.some(c => isToday(c))
    ).length 

    const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`

    return <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm"> {doneToday} / {habits.length} done today</span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex flex-row items-center gap-3">
          <Button 
            onClick={onPrev}
          >
            Prev
          </Button>
          <Button 
            onClick={onNext} 
            // the next button will be disabled if some day in the range 
            // of visibleDates is equals to today's date
            disabled={visibleDates.some(d => isToday(d))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  }