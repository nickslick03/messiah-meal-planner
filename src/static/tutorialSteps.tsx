
interface TutorialStep {
    position?: keyof DOMRect
    title: string,
    description: JSX.Element,
    action?: JSX.Element
}

const tutorialSteps: TutorialStep[] = [
    {
        title: 'Tutorial Intro',
        description: 
            <p>Welcome to the Messiah Meal Planner! This website allows you to plan your meals for the semester 
            and budget your dining dollars. Follow this tutorial to learn more about Messiah's student meal plan and how to budget for it.</p>,
    },
    {
        position: 'bottom',
        title: 'Meal Plan Info',
        description: 
            <div>This is where you'll enter info about the semester and your meal plan. The start and end dates of the semester
            can be found <a href="https://www.messiah.edu/homepage/1346/academic_calendars_for_messiah_college" target="_blank" rel="noopener noreferrer" className="text-indigo-900 underline">here</a>.
            If this is your first semester, here is some info to help:
                <ul className="list-disc ml-5">
                    <li>Unless you're a commuter, check the "Dining Dollars Discount."</li>
                    <li>Set the starting balance to 1200.</li>
                </ul>
            </div>,
        action:
            <strong>Complete the meal plan info form.</strong>,
    },
    {
        title: 'Available Meals',
        description: 
            (<p>You'll plan your meals with a 7-day template that's repeated the number of weeks in the semester. Add meals directly to a weekday by
            {' '}{/Mobi|Android/i.test(navigator.userAgent) ? 'long pressing an add button' : 'hovering over an add button'}, or click an add button 
            to add a meal to the meal queue.</p>),
    },
    {
        title: 'Meal Queue',
        description:
            (<p>The meal queue allows you to add a group of meals to multiple days. Once meals are added to the meal queu, select the preffered days and click
            "Add to selected days".</p>),
    },
    {
        title: 'Day Editor',
        description: 
            (<p>Here, you can see and edit the meals in each week day, along with budgeting information of the selected day.</p>),
    },
    {
        title: 'Results',
        description: 
            (<p>The results section shows your meal plan stats and 2 graphs. If your starting balance is less than the grand total, you need to replan!</p>),
    },
    {
        title: 'Conclusion',
        description: 
            (<p>If you are ever confused, click the question mark icons in the corners of each section to see an explanation. Best of luck with the semester!</p>),
    }
];

export default tutorialSteps;