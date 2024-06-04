
export default function Footer() {
    return (
        <>
            <footer className="bg-black dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
                    <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2023 <a href="javascript;" className="hover:underline">ABC™</a>. All Rights Reserved.
                    </span>
                    {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul> */}
                </div>
            </footer>
        </>
    )
}