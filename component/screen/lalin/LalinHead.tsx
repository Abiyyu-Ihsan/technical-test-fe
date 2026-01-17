import { SidebarTrigger } from "@shadcn/components/ui/sidebar";

const LalinHead = () => {
    return (
        <div className="flex flex-col gap-5 md:flex-row">
            <div className="w-full px-2 sm:px-0">
                <div
                    className="border dark:border border-neutral-300 bg-white text-black 
          dark:border-[#40444b] dark:bg-[#292B2F]
          transition-colors duration-300 rounded-t-2xl p-4"
                >
                    <div className="flex items-center">

                        <SidebarTrigger />

                        <span className="text-neutral-300 dark:text-white mx-4 font-semibold text-lg">
                            |
                        </span>

                        <h1 className="text-zinc-800 dark:text-[#F0F3FA] font-semibold text-base leading-6">
                            Laporan Harian Per Hari
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LalinHead
