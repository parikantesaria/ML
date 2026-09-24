import React, { useState, useMemo } from 'react'
import RiskBadge from './RiskBadge'
import './DataTable.css'

export default function DataTable({
  columns,
  data,
  searchable = false,
  sortable = true,
  paginated = true,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No data available',
}) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  const handleSort = (key) => {
    if (!sortable) return
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(row =>
      columns.some(col => {
        const val = row[col.key]
        return val !== undefined && String(val).toLowerCase().includes(q)
      })
    )
  }, [data, search, columns])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = paginated ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1
  const paged = paginated ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted

  const renderCell = (col, row) => {
    if (col.render) return col.render(row[col.key], row)
    if (col.type === 'risk') return <RiskBadge level={row[col.key]} />
    if (col.type === 'default') {
      return (
        <span className={`data-table__default-badge data-table__default-badge--${row[col.key] === 1 ? 'yes' : 'no'}`}>
          {row[col.key] === 1 ? 'Default' : 'No Default'}
        </span>
      )
    }
    if (col.type === 'currency') return `$${Number(row[col.key]).toLocaleString()}`
    if (col.type === 'percent') return `${row[col.key]}%`
    return row[col.key]
  }

  return (
    <div className="data-table">
      {searchable && (
        <div className="data-table__toolbar">
          <div className="data-table__search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="data-table__search-input"
              aria-label="Search table"
            />
          </div>
          <span className="data-table__count">
            {filtered.length.toLocaleString()} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead className="data-table__thead">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`data-table__th ${sortable && !col.nosort ? 'data-table__th--sortable' : ''} ${sortKey === col.key ? 'data-table__th--sorted' : ''}`}
                  onClick={() => !col.nosort && handleSort(col.key)}
                  style={{ width: col.width, textAlign: col.align || 'left' }}
                >
                  {col.label}
                  {sortable && !col.nosort && (
                    <span className="data-table__sort-icon">
                      {sortKey === col.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className="data-table__row">
                  {columns.map(col => (
                    <td key={col.key} className="data-table__td">
                      <div className="data-table__skeleton-cell" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="data-table__empty">
                  <EmptyIcon />
                  <span>{emptyMessage}</span>
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={row.id || i} className="data-table__row">
                  {columns.map(col => (
                    <td key={col.key} className="data-table__td" style={{ textAlign: col.align || 'left' }}>
                      {renderCell(col, row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <div className="data-table__pagination">
          <span className="data-table__pagination-info">
            Page {page} of {totalPages} · {sorted.length.toLocaleString()} records
          </span>
          <div className="data-table__pagination-controls">
            <button
              className="data-table__page-btn"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >«</button>
            <button
              className="data-table__page-btn"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >‹</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4))
              const p = start + i
              return p <= totalPages ? (
                <button
                  key={p}
                  className={`data-table__page-btn ${p === page ? 'data-table__page-btn--active' : ''}`}
                  onClick={() => setPage(p)}
                >{p}</button>
              ) : null
            })}
            <button
              className="data-table__page-btn"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >›</button>
            <button
              className="data-table__page-btn"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >»</button>
          </div>
        </div>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function EmptyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}
