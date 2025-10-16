import React, { useEffect, useState } from 'react';
import ArtworksTable from '../components/ArtworksTable';
import type { DataTablePageEvent } from 'primereact/datatable';


interface Artwork {
  id: number | string;
  title: string;
  place_of_origin?: string;
  artist_display?: string;
  inscriptions?: string;
  date_start?: string | number;
  date_end?: string | number;
}

interface ArtworksResponse {
  data: Artwork[];
  pagination?: {
    total_pages?: number;
  };
}

const ArtworksPage: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtworksResponse>({ data: [] });
  const [page, setPage] = useState<number>(1);
  const [first, setFirst] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const rows: number = 12;

  const handlePageChange = (e: DataTablePageEvent) => {
    const newPage = e.first / e.rows + 1;
    setPage(newPage);
    setFirst(e.first);
  };

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
      const data: ArtworksResponse = await response.json();
      setArtworks(data);
      setTotalPages(data.pagination?.total_pages || 1);
    } catch (err) {
      console.error('Unable to fetch artworks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [page]);

  return (
    <div>
      <ArtworksTable
        artworks={artworks}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
        first={first}
        rows={rows}
      />
    </div>
  );
};

export default ArtworksPage;
