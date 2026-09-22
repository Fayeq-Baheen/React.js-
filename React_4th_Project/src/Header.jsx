export default function Header() {
    return(
        <header className="flex flex-col gap-4 bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <img src="/img4.png" alt="Learning Center" className="h-10 w-auto"/>
            <nav className="flex gap-4">
                <a href="#courses">Courses</a>
                <a href="#footer">Contact</a>
            </nav>
        </header>
    )
}