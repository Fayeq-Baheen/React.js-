import Header from "./Header.jsx"
import Card from "./Card.jsx"
import Footer from "./Footer.jsx"

export default function App() {
    return(
        <div className="min-h-screen bg-slate-100">
            <Header/>
            <main id="courses" className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
                <Card title="Hello" description="Lorem ipsum dolor sit amet." imageURL="/img1.png"/>
                <Card title="ABC" description="Lorem ipsum dolor sit amet." imageURL="/img2.png"/>
                <Card title="qweas" description="Lorem ipsum dolor sit amet." imageURL="/img3.png"/>
            </main>
            <Footer/>
        </div>
    )
}