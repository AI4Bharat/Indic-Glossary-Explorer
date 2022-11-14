// IntroductionCard
import { Grid } from '@mui/material';
import React from 'react';
import landingCardRightSideImage from '../../../../assets/landingCardRightSideImage.png'
import '../../../styles/introCardStyle.css';

const IntroductionCard = () => {

    const onDemoClick=()=>{
        // main-component
        const element = document.getElementById("main-component");
        element.scrollIntoView();
    }

    return(
        <section className="section about">
        {/* <!-- <div className="shape2"><img src="%PUBLIC_URL%/img/slide1-bg.jpg" alt="shapes"></div> --> */}
        <div className="container-fluid section-bg">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                    {/* <!-- <h5 className="text-primary text-uppercase h7">Universal Language Contribution API</h5> --> */}
                    <div className="h1 text-black mt-4 mb-4">Indic Glossary Explorer</div>
                    <p className="ft-20"><b>Indic Glossary Explorer</b> is an <b>open source</b> service to store and explore relevant Indic glossary which are domain specific. 
                        The service also provides the capabities for glossary contribution (individual/batch).</p>
                    {/* <a className="demo-btn" onClick={onDemoClick}>Try Demo</a> */}
                    <a className="demo-btn" target="_blank" href="https://github.com/AI4Bharat/Indic-Glossary-Explorer">Codebase</a>
                    <a className="demo-btn" target="_blank" href="https://github.com/AI4Bharat/Indic-Glossary-Explorer/wiki">Tutorial</a>
                    <a className="demo-btn" href="#">Introduction Video</a>
                    <a className="demo-btn" target="_blank" href="https://app.swaggerhub.com/apis/ai4bharat-iitm/indic-glossary-explorer/1.0.0">API Specs</a>
                </div>
                <div className="col-md-5">
                    <div className="aboutImg"><img src={landingCardRightSideImage} alt="About ULCA" /></div>
                </div>
            </div>
        </div>
    </section>
    )
};

export default IntroductionCard;