interface ScreenContainerProps {
  children?: React.ReactNode;
}

const ScreenContainer = ({
  children = <></>
}: ScreenContainerProps): JSX.Element => (
  <section className='w-full md:w-4/5 p-4 md:p-0 mx-auto flex flex-col mb-4 mt-4'>
    {children}
  </section>
);

export default ScreenContainer;
