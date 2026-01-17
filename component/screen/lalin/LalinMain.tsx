import LalinHead from "./LalinHead";
import LalinList from "./LalinList";


export default function LalinMain() {
  return (
    <div className="mb-6 min-h-screen grow lg:mb-8 bg-[#F9FAFB] dark:bg-[#202225]">
      <div className="mx-2 mt-6 space-y-8 xl:mt-8 lg:mx-6 2xl:mx-8">
        <LalinHead />
      </div>
      <div className="mx-2 mt-0.5 lg:mx-6 2xl:mx-8">
<LalinList/>
      </div>
    </div>
  )
}
