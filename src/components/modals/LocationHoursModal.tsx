import { Dispatch, SetStateAction } from 'react';
import ModalContainer from '../containers/ModalContainer';
import locationHours from '../../static/locationHours';
import DotLeader from '../other/DotLeader';

interface LocationHoursModalProps {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

/**
 * Component for displaying a the hours of the dining facilities.
 */
const LocationHoursModal = ({
    isVisible,
    setIsVisible,
}: LocationHoursModalProps) => {
  return isVisible ? (
    <ModalContainer
      title='Location Hours'
      cancelText='Close'
      onCancel={() => setIsVisible(false)}
      onlyCancel={true}
      centered={false}
    >
    <div className='text-center'>
        {locationHours.map((location, i) => 
            <div>
                <h2 className='text-3xl font-bold mb-4'>{location.name}</h2>
                {
                    location.hoursType === 'broken'
                    ? Object.entries(location.hours).map(([day, times]) => 
                        <>
                            <h3 className='text-xl font-bold my-4 text-left'>{day}</h3>
                            <DotLeader 
                                info={Object.entries(times).map(([meal, time]) => ({
                                    title: meal,
                                    value: time,
                                    resultsStyle: time === 'Closed' ? 'text-messiah-red' : ''
                                }))}
                            />
                        </>)
                    :   <DotLeader 
                            info={Object.entries(location.hours).map(([day, time]) => ({
                                title: day,
                                value: time,
                                resultsStyle: time === 'Closed' ? 'text-messiah-red' : ''
                            }))} 
                        />
                }
                {i + 1 != locationHours.length ? (
                  <div className='w-full h-[1px] bg-gray-300 mt-10 mb-5'></div>
                ) : (
                  ''
                )}
            </div>
            
        )}
    </div>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default LocationHoursModal;
