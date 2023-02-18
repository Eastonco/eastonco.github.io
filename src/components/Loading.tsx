
export const Loading = () => {
    return (
        <div className='card'>
            <div className='card-body'>
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};