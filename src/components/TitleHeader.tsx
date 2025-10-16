import { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import type { RefObject } from 'react';

interface TitleHeaderProps {
  rowsCountRef: RefObject<number>;
  rowsToSelect: (num: number) => void;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ rowsCountRef, rowsToSelect }) => {
  const op = useRef<OverlayPanel | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.selectedRows as HTMLInputElement;

    rowsCountRef.current = parseInt(input.value);
    console.log(rowsCountRef);

    op.current?.hide();
    rowsToSelect(rowsCountRef.current);

    if (!rowsCountRef.current || rowsCountRef.current <= 0) return;

  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
      <div>Title</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
        <Button
          type="button"
          icon="pi pi-chevron-down"
          text
          onClick={(e) => op.current?.toggle(e)}
        />
        <OverlayPanel ref={op} style={{ borderRadius: "8px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "8px" }}>
              <input
                type="number"
                name="selectedRows"
                id="selectedRows"
                placeholder="Select Rows..."
                min="1"
                required
                style={{
                  padding: "8px 10px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </OverlayPanel>
      </div>
    </div>
  );
};

export default TitleHeader;
