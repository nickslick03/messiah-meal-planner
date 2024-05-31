interface ScreenContainerProps {
  children?: React.ReactNode;
}

/**
 * Renders a screen container with the provided children. This just sets the margins and font for the content.
 *
 * @param {ScreenContainerProps} props - The props for the ScreenContainer component.
 * @param {React.ReactNode} props.children - The children components to render inside the screen container.
 * @return {JSX.Element} The rendered screen container.
 */
const ScreenContainer = ({
  children = <></>
}: ScreenContainerProps): JSX.Element => (
  <section className='relative w-full md:w-3/5 p-4 md:p-0 mx-auto flex flex-col mb-4 mt-4 font-inter'>
    {children}
  </section>
);

export default ScreenContainer;
