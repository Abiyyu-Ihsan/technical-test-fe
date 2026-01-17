import OverviewHead from "./OverviewHead";
import OverviewScreen from "./OverviewScreen";


export default function MainOverview() {
    return (
        <div className="mb-6 min-h-screen grow lg:mb-8 bg-[#F9FAFB] dark:bg-[#202225]">
            <div className="mx-2 mt-6 space-y-8 xl:mt-8 lg:mx-6 2xl:mx-8">
                <OverviewHead />
            </div>
            <div className="mx-2 mt-0.5 lg:mx-6 2xl:mx-8">
                <OverviewScreen />
            </div>
        </div>
    )
}
