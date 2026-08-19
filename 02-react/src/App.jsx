import { useState } from "react";

import jobsData from "./data/data.json";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";

const RESULTS_PER_PAGES = 5;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGES);

  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGES,
    currentPage * RESULTS_PER_PAGES,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <main>
        <SearchFormSection />

        <section>
          <JobListings jobs={pagedResults} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
