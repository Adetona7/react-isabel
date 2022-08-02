import React from 'react';

function Footer() {
    return(
        <div>
            <footer className="bg-light pt-3" style={{textAlign: "center"}}> 
                <i class="fa-brands fa-twitter me-2"></i>
                <i class="fa-brands fa-instagram me-2"></i>  
                <i class="fa-brands fa-facebook me-2"></i>
                <i class="fa-brands fa-youtube me-2"></i>
                <p className="pt-3 pb-3"><i class="far fa-copyright me-1"></i><b>Copyright Isabel College</b></p>
            </footer>
        </div>
    );
}

export default Footer;