import React from "react";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeView from "./views/HomeView";
import Footer from "./components/Footer";
import WeddingPlanningView from "./views/WeddingPlanning/WeddingPlanningView";
import EventPlanningView from "./views/EventPlanning/EventPlanningView";
import FullWeddingPlanningView from "./views/WeddingPlanning/FullWeddingPlanningView";
import PartialWeddingPlanningView from "./views/WeddingPlanning/PartialWeddingPlanningView";
import ScrollToTop from "./components/ScrollToTop";
import WeddingCoordinationView from "./views/WeddingPlanning/WeddingCoordinationView";
import WeddingALaCarteView from "./views/WeddingPlanning/WeddingALaCarteView";
import WeddingDesignView from "./views/WeddingPlanning/WeddingDesignView";
import IntimateWeddingsAndElopementsView from "./views/WeddingPlanning/IntimateWeddingsAndElopementsView";
import UnderConstruction from "./components/UnderConstruction";

function App() {
  return (
      <div>
          <BrowserRouter>
              <ScrollToTop />
              <NavigationBar />
              <div className="pt-18">
                  <Routes>
                      <Route exact path="/" element={<HomeView />} />
                      <Route exact path="/wedding-planning" element={<WeddingPlanningView />} />
                      <Route exact path="/full-wedding-planning" element={<FullWeddingPlanningView />} />
                      <Route exact path="/partial-planning" element={<PartialWeddingPlanningView />} />
                      <Route exact path="/wedding-coordination" element={<WeddingCoordinationView />} />
                      <Route exact path="/a-la-carte" element={<WeddingALaCarteView />} />
                      <Route exact path="/wedding-design" element={<WeddingDesignView />} />
                      <Route exact path="/intimate-and-elopements" element={<IntimateWeddingsAndElopementsView />} />
                      <Route exact path="/event-planning" element={<EventPlanningView />} />
                      <Route exact path="/corporate-events" element={<UnderConstruction />} />
                      <Route exact path="/events-and-galas" element={<UnderConstruction />} />
                      <Route exact path="/parties-and-celebrations" element={<UnderConstruction />} />
                      <Route exact path="/amazing-proposals" element={<UnderConstruction />} />
                      <Route exact path="/about" element={<UnderConstruction />} />
                      <Route exact path="/proposal-packages" element={<UnderConstruction />} />
                      <Route exact path="/testimonials" element={<UnderConstruction />} />
                      <Route exact path="/instagram" element={<UnderConstruction />} />
                      <Route exact path="/photo-albums" element={<UnderConstruction />} />
                      <Route exact path="/contactform" element={<UnderConstruction />} />
                      <Route exact path="/blog" element={<UnderConstruction />} />
                  </Routes>
              </div>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
