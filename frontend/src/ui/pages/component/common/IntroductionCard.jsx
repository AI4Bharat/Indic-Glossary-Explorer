// IntroductionCard
import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import landingCardRightSideImage from '../../../../assets/landingCardRightSideImage.png'
import '../../../styles/introCardStyle.css';
import ViewGlossary from '../SearchAndViewGlossary/ViewGlossary';

const IntroductionCard = (props) => {

    const {searchComponent, belowIntroCardComponent, showIntroBanner} = props;

    const glossaryData = useSelector((state) => state.searchGlossary);

    const onDemoClick=()=>{
        // main-component
        const element = document.getElementById("main-component");
        element.scrollIntoView();
    }

    return(
        <section className="section about">
        {showIntroBanner && <div className="container-fluid section-bg">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                    <div className="h1 text-black mt-4 mb-4">Indic Glossary Explorer</div>
                    <p className="ft-20">An <b>open source</b> service to store and explore relevant Indic glossary which are domain specific. 
                        The service also provides the capabities for glossary contribution (individual/batch).</p>
                </div>
                <div className="col-md-5">
                    <div className="aboutImg"><img src={landingCardRightSideImage} id="bannerUlcaImg" alt="About ULCA" /></div>
                </div>
            </div>
            {searchComponent}
        </div>}
        {glossaryData[0]?.glossaryPhrases.length > 0 && <ViewGlossary glossaryData={glossaryData[0]?.glossaryPhrases} inputText={glossaryData[0]?.input} publicLayout={true} />}
        {belowIntroCardComponent}
    </section>
    )
};

export default IntroductionCard;