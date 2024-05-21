import ModalContainer from './components/containers/ModalContainer';
import SectionContainer from './components/containers/SectionContainer';
import MealTable from './components/containers/table/MealTable';
import ScreenContainer from './components/containers/ScreenContainer';
import Input from './components/form_elements/Input';
import { useEffect, useState } from 'react';
import Select from './components/form_elements/Select';

function App() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [mealPlan, setMealPlan] = useState('false');
  const [balance, setBalance] = useState('1200');

  const [dining, setDining] = useState('');

  useEffect(() => console.log(dining));

  return (
    <ScreenContainer>
      <header className='bg-messiah-blue rounded-xl border-4 border-white shadow-md w-full my-4'>
        <h1 className='font-semibold text-4xl text-white text-center p-8'>
          Messiah Meal Planner
        </h1>
      </header>
      <ModalContainer
        title='Modal 1'
        confirmText='OK Great!'
        cancelText='Dismiss'
      >
        This is a modal dialog!
      </ModalContainer>
      <SectionContainer title='Section 1'>
        <MealTable
          data={[
            { location: 'Lottie', name: 'Food', price: 5 },
            { location: 'Lottie', name: 'Food', price: 5 },
            { location: 'Lottie', name: 'Food', price: 5 }
          ]}
          buttonTitle='+'
          buttonOnClick={() => console.log('Add meal')}
        />
      </SectionContainer>
      <div className='mt-4'>
        <SectionContainer title='Meal Info'>
          <form className='mt-4 flex flex-col gap-4'>
            <Input
              label={'Start Date:'}
              type={'date'}
              value={startDate}
              setValue={setStartDate}
              validator={(str) => !isNaN(Date.parse(str))}
            />
            <Input
              label={'End Date:'}
              type={'date'}
              value={endDate}
              setValue={setEndDate}
              validator={(str) =>
                !isNaN(Date.parse(str)) &&
                +Date.parse(str) >= +Date.parse(startDate)
              }
            />
            <Input
              label={'Meal Plan:'}
              type={'checkbox'}
              value={mealPlan}
              setValue={setMealPlan}
            />
            <Input
              label={'Starting Balance:'}
              type={'number'}
              value={balance}
              setValue={setBalance}
              validator={(str) => {
                console.log(str);
                console.log(isNaN(parseFloat(str)));
                console.log(parseFloat(str) >= 0);
                return (
                  (!isNaN(parseFloat(str)) && parseFloat(str) >= 0) ||
                  str === ''
                );
              }}
            />
            <Select
              label={'dining location:'}
              list={['Lottie', 'Union', 'Falcon']}
              setSelected={setDining}
            />
          </form>
        </SectionContainer>
      </div>
    </ScreenContainer>
  );
}

export default App;
