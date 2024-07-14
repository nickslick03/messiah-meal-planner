import { IoAdd, IoRemove } from 'react-icons/io5';
import smAvailableMeals from '../assets/sm-availableMeals.png';
import lgAvailableMeals from '../assets/lg-availableMeals.png';
import smDayEditor from '../assets/sm-dayEditor.png';
import lgDayEditor from '../assets/lg-dayEditor.png';
import smMealPlanInfo from '../assets/sm-mealPlanInfo.png';
import lgMealPlanInfo from '../assets/lg-mealPlanInfo.png';
import smMealQueue from '../assets/sm-mealQueue.png';
import lgMealQueue from '../assets/lg-mealQueue.png';
import smResults from '../assets/sm-results.png';
import lgResults from '../assets/lg-results.png';

const ICON_SIZE = 15;

export interface TutorialObject {
  title: string;
  text: JSX.Element;
  images: {
    small: string;
    large: string;
  };
}

const tutorial = {
  mealPlanInfo: {
    title: 'Meal Plan Info',
    images: {
      small: smMealPlanInfo,
      large: lgMealPlanInfo
    },
    text: (
      <>
        <p>
          Before you can start planning your meals, you'll need to fill out some
          details about your meal plan.
        </p>
        <ul className='list-disc list-inside'>
          <li>
            <strong>Start Date:</strong> Enter the date you want your planned
            meals to start on. This could be the start date of the next
            semester, today, or whatever date you want to plan from.
          </li>
          <li>
            <strong>End Date:</strong> Enter the date you want your planned
            meals to end on. Generally, you will want this to be the day you
            move out at the end of the semester.
          </li>
          <li>
            <strong>Dining Dollars Discount:</strong> Check this if you use the
            Dining Dollars plan, with the discount.
          </li>
          <li>
            <strong>Number of Weeks off:</strong> Enter the number of weeks you
            will not be on campus (e.g. fall break, spring break). It will reduce 
            the number of weeks when calculating the total cost.
          </li>
          <li>
            <strong>Starting Balance:</strong> Enter the amount you will have in
            your meal plan account on the day you entered for "Start Date"
          </li>
        </ul>
      </>
    )
  },
  availableMeals: {
    title: 'Available Meals',
    images: {
      small: smAvailableMeals,
      large: lgAvailableMeals
    },
    text: (
      <p>
        This table is where you can start planning your meals. It shows
        Messiah's most common meals. It can be sorted by clicking the button in
        the top right and searched using the search bar. Click the{' '}
        <IoAdd size={ICON_SIZE} className='inline' /> button to add a meal to
        your queue. If the meal you want to add isn't in the table, click
        "Custom meal", fill out the meal details, and then click "Add". Your
        custom meal will now show in the meals table until you remove it. If you
        want to change or remove the custom meal, simply click on its title in
        the table and an editor will pop up with the option to delete as well.
      </p>
    )
  },
  mealQueue: {
    title: 'Meal Queue',
    images: {
      small: smMealQueue,
      large: lgMealQueue
    },
    text: (
      <p>
        This is your staging area for meals you want to add to certain days.
        Once you've selected a group of meals from the Available Meals table,
        you will see them in this table. When you have the right meals in your
        queue, you can add all the meals in the queue to certain days of the
        week by selecting the days at the bottom of the section and clicking
        "Add meals to selected days". You can remove individual meals from here
        by clicking the
        <IoRemove size={ICON_SIZE} className='inline' /> button, or you can
        clear the whole queue by clicking "Clear meal queue".
      </p>
    )
  },
  dayEditor: {
    title: 'Day Editor',
    images: {
      small: smDayEditor,
      large: lgDayEditor
    },
    text: (
      <>
        <p>
          Here you can see the meals you've added to each day and remove any you
          need to. Click the weekday buttons in the top bar to view and edit the
          meals planned for each day of the week., This section also displays
          some stats for each day:
        </p>
        <ul className='list-disc list-inside'>
          <li>
            <strong>Total for One ___day:</strong> The total cost of all the
            meals on one occurrence of that day.
          </li>
          <li>
            <strong>Number of ___days:</strong>The number of times that day
            occurs in your timeframe.
          </li>
          <li>
            <strong>Total of All ___days:</strong> The total cost of all the
            meals on that day times the number of times that day occurs in your
            timeframe.
          </li>
        </ul>
      </>
    )
  },
  results: {
    title: 'Results',
    images: {
      small: smResults,
      large: lgResults
    },
    text: (
      <>
        <p>
          Here you can see the stats of your meal plan and some graphs of it as
          well. The following stats are displayed: Many of these stats can also
          be seen in the bar at the bottom of the screen.
        </p>
        <ul className='list-disc list-inside'>
          <li>
            <strong>Starting Balanace:</strong> The amount you entered for
            "Starting Balance" in the Meal Plan Info section.
          </li>
          <li>
            <strong>Weekly Total:</strong> The amount of money you would spend
            in a full week if you follow your plan.
          </li>
          <li>
            <strong>Grand Total:</strong> The amount of money you would spend
            between your chosen start and end dates if you follow your plan.
          </li>
          <li>
            <strong>Date When Money Runs Out:</strong> If you are overplanning,
            you will see this date. It tells you when your meal plan will run
            out if you follow your plan. Note that if you are taking a 1-week
            break, this date assumes that break passes BEFORE this date.
          </li>
          <li>
            You will also see how much money you have left at the end or how
            much you went over your starting balance.
          </li>
        </ul>
        <br />
        <p>
          There are also two graphs of your meal plan. The first is a bar graph
          showing how much you spend each day and how it breaks down into
          locations. The second is a pie chart that shows you how much you spend
          at each location in a given week.
        </p>
      </>
    )
  }
};

export default tutorial;
