import { Search, X } from "lucide-react";

type SearchBarProps = { value: string; onChange: (value: string) => void };

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-field">
      <span className="sr-only">Buscar recetas</span>
      <Search aria-hidden="true" size={21} />
      <input value={value} onChange={(event) => onChange(event.target.value)} type="search" placeholder="Busca avena, chocolate, crepes…" autoComplete="off" />
      {value && <button type="button" onClick={() => onChange("")} aria-label="Borrar búsqueda"><X aria-hidden="true" size={19} /></button>}
    </label>
  );
}
