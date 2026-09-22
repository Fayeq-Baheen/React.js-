export default function Info({ids, name, lastName}){
    
    return (
        <div>
            <p>{ids}</p>
            <h2>{name}</h2>
            <p>{lastName}</p>
        </div>
    )
}