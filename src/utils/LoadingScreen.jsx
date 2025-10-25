import './css/loadingscreen.css';

function LoadingScreen({ message = "Loading..", size = "large", inline = false }) {
    return (
        <div className={`loading-wrapper ${inline ? 'inline' : ''}`}>
            <div className={`spinner ${size}`}></div>
            {!inline && <p>{message}</p>}
        </div>
    );
}

export default LoadingScreen;
