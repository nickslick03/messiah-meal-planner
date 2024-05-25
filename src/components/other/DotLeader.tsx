import { IMPORTANCE_CLASSES } from "../../static/constants";
import { ImportanceIndex, newImportanceIndex } from "../../types/ImportanceIndex";

const DOTS = "........................................................................................................................................................................................................................................";

interface DotLeaderProps {
    info: {
        title: string,
        titleImportance?: ImportanceIndex
        value: string | number,
    }[];
}

const DotLeader = ({
    info
}: DotLeaderProps) => {

    return (
        <div className="w-full flex flex-col gap-4">
            {info.map(({
                title,
                titleImportance = newImportanceIndex(3),
                value
            }, i) => {
                const importance = IMPORTANCE_CLASSES[titleImportance];
                return (
                    <div className="flex gap-1" key={i}>
                        <div className={`${importance}`}>
                            {title}
                        </div>
                        <div className="flex-1 flex justify-center overflow-hidden">
                            <div className="tracking-widest font-light">
                                {DOTS}
                            </div>
                        </div>
                        <div>
                            {value}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DotLeader;