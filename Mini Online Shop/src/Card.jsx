export default function Card({title, description, imageURL}){
    return(
        <article>
            <img src={imageURL} alt="title" className="h-40 w-full rounded-lg object-cover"/>
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <p className="mt-2 text-slate-600">{description}</p>
            <button type="button" className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white">View Course</button>
        </article>
    )
}