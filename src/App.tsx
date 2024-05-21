import ModalContainer from './components/containers/ModalContainer';
import SectionContainer from './components/containers/SectionContainer';
import MealTable from './components/containers/table/MealTable';
import ScreenContainer from './components/containers/ScreenContainer';

function App() {
  return (
    <ScreenContainer>
      <header className='bg-messiah-blue rounded-xl border-4 border-white shadow-md w-full mb-4 mt-4'>
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
    </ScreenContainer>
  );
}

export default App;
