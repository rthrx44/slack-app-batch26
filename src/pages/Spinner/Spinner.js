import './Spinner.css'

function Spinner(){
    return( 
        <div className="spinner-container">
            <div className="spinner-content">
                <h1 className='loading-text'>Fetching data, one bit at a time...</h1>
                <div className='loading'></div>
            </div>
        </div>
            
    )
}
export default Spinner;