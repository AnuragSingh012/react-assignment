import { DataTable } from 'primereact/datatable';
import type { DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef, useEffect } from 'react';
import TitleHeader from './TitleHeader';

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
}

interface ArtworksTableProps {
  artworks: ArtworksResponse;
  totalPages: number;
  onPageChange: (event: any) => void;
  loading: boolean;
  first: number;
  rows: number;
  page: number;
}

const ArtworksTable: React.FC<ArtworksTableProps> = ({
  artworks,
  totalPages,
  onPageChange,
  loading,
  first,
  rows
}) => {

  const op = useRef<any>(null);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const rowsCountRef = useRef<number>(0);

  const rowsToSelect = (num: number) => {
    console.log("num = ", num);
    const selectedRows = artworks.data.slice(0, num);
    console.log("selectedRows = ", selectedRows);

    setSelectedArtworks(prev => [...prev, ...selectedRows]);

    rowsCountRef.current = rowsCountRef.current - selectedRows.length;
  };

  useEffect(() => {
    console.log("Page Changed");
    if (rowsCountRef.current > 0) {
      rowsToSelect(rowsCountRef.current);
    }
  }, [artworks?.data]);

  return (
    <div className="card">
      <DataTable
        value={artworks?.data || []}
        paginator
        first={first}
        rows={rows}
        onPage={onPageChange}
        loading={loading}
        totalRecords={totalPages}
        lazy
        selection={selectedArtworks}
        onSelectionChange={(e: DataTableSelectionChangeEvent) => setSelectedArtworks(e.value as Artwork[])}
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column
          field="title"
          header={
            <TitleHeader
              setSelectedArtworks={setSelectedArtworks}
              artworks={artworks}
              rowsCountRef={rowsCountRef}
              rowsToSelect={rowsToSelect}
            />
          }
        ></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist Display"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
};

export default ArtworksTable;
