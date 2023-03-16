import './Spinner.css'

function Spinner(){
    return( 
        <div className="spinner-container">
            <div className="spinner-content">
                <h1 className='loading-text'>Loading</h1>
                <div className='loading'></div>
            </div>
        </div>
            
    )
}
export default Spinner;