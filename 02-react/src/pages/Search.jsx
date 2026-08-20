import { useState, useEffect } from "react";

import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";

const RESULTS_PER_PAGES = 4;

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });
  const [textToFilter, setTextToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("location", filters.location);
        if (filters.experienceLevel)
          params.append("experienceLevel", filters.experienceLevel);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [textToFilter, filters]);

  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGES);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (text) => {
    setTextToFilter(text);
    setCurrentPage(1);
  };

  return {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  };
};

export function SearchPage() {
  const {
    jobs,
    total,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  } = useFilters();
  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - Dev `;
  }, [total, currentPage]);

  return (
    <>
      <main>
        <SearchFormSection
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
        />

        <section>
          {loading ? <p>Cargando los empleos</p> : <JobListings jobs={jobs} />}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </>
  );
}
