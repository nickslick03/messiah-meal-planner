import ModalContainer from './components/containers/ModalContainer';
import SectionContainer from './components/containers/SectionContainer';

function App() {
  return (
    <>
      <header className='bg-blue-500 m-4 rounded-xl border-4 border-white shadow-md'>
        <h1 className='font-semibold text-4xl text-white text-center p-8'>
          Messiah Meal Planner
        </h1>
      </header>
      <ModalContainer>This is a modal dialog!</ModalContainer>
      <SectionContainer title='Section 1'>hi</SectionContainer>
    </>
  );
}

export default App;
