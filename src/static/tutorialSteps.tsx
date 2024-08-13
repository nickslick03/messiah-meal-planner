import { IoAdd } from 'react-icons/io5';
import { TUTORIAL_ICON_SIZE as ICON_SIZE } from './constants';

interface TutorialStep {
  /**
   * The position of the tutorial step on the screen.
   */
  position?: 'center' | 'start' | 'end';

  /**
   * The order of the tutorial step within the tutorial.
   */
  order?: number;

  /**
   * The title of the tutorial step.
   */
  title: string;

  /**
   * The description of the tutorial step.
   */
  description: JSX.Element;

  /**
   * The action element to display for the tutorial step.
   */
  action?: JSX.Element;
}

/**
 * Array of TutorialStep objects.
 */
const tutorialSteps: TutorialStep[] = [
  {
    position: 'center',
    title: 'Tutorial Intro',
    description: (
      <p>
        Welcome to the Messiah Meal Planner! This website allows you to plan
        your meals for the semester and budget your dining dollars. Follow this
        tutorial to learn more about Messiah's student meal plan and how to
        budget for it.
      </p>
    )
  },
  {
    title: 'Meal Plan Info',
    description: (
      <div>
        This is where you'll enter info about the semester and your meal plan.
        The start and end dates of the semester can be found{' '}
        <a
          href='https://www.messiah.edu/homepage/1346/academic_calendars_for_messiah_college'
          target='_blank'
          rel='noopener noreferrer'
          className='text-indigo-900 underline'
        >
          here
        </a>
        . If this is your first semester, here is some info to help:
        <ul className='list-disc ml-5'>
          <li>
            If you live in the residence halls, check the "Dining Dollars
            Discount."
          </li>
          <li>Set the starting balance to 1200.</li>
        </ul>
      </div>
    ),
    action: <strong>Complete the meal plan info form.</strong>
  },
  {
    title: 'Available Meals',
    description: (
      <p>
        You'll plan your meals with a 7-day template that's repeated the number
        of weeks in the semester. Add meals directly to a weekday by{' '}
        {/Mobi|Android/i.test(navigator.userAgent) ? (
          <span>
            long pressing a <IoAdd size={ICON_SIZE} className='inline' /> button
          </span>
        ) : (
          <span>
            hovering over a <IoAdd size={ICON_SIZE} className='inline' /> button
          </span>
        )}
        , or click a <IoAdd size={ICON_SIZE} className='inline' /> button to add
        a meal to the meal queue.
      </p>
    ),
    action: (
      <strong>
        Choose some meals that look good and add them to the meal queue.
      </strong>
    )
  },
  {
    title: 'Meal Queue',
    description: (
      <p>
        The meal queue allows you to add a group of meals to multiple days. Once
        meals are added to the meal queue, select the preferred days and click
        "Add to selected days".
      </p>
    ),
    action: (
      <strong>
        Select a few days and click the "Add to selected days" button.
      </strong>
    )
  },
  {
    title: 'Day Editor',
    description: (
      <p>
        Here, you can see and edit the meals in each week day, along with
        budgeting information of the selected day.
      </p>
    ),
    action: (
      <strong>Take a look at each day and see what you've planned.</strong>
    )
  },
  {
    title: 'Results',
    description: (
      <p>
        The results section shows your meal plan stats and two graphs. If your
        starting balance is less than the grand total, you need to replan!
      </p>
    ),
    action: <strong>Take a look at your meal plan stats and graphs.</strong>
  },
  {
    position: 'center',
    title: 'Conclusion',
    description: (
      <p>
        If you are ever confused, click the question mark icons in the corners
        of each section to see an explanation. Best of luck with the semester!
      </p>
    )
  }
];

export default tutorialSteps;
