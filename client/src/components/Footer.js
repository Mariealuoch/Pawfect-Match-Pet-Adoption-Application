function Footer(){
    return(
        <footer className="footer mt-auto footer-color">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>
            </div>
            </div>
            
           
        {/* Bottom Links Section */}
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-md-3 ">
              <a href="#" className="text-color">Home</a>
            </div>
            <div className="col-md-3">
              <a href="#" className="text-color">Donate</a>
            </div>
            <div className="col-md-3">
              <a href="#" className="text-color">Terms Of Business</a>
            </div>
            <div className="col-md-3">
              <a href="#" className="text-color">Privacy Policy</a>
            </div>

          </div>
        </div>
      </footer>
    );
}
export default Footer