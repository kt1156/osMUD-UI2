package reader

import (
	"database/sql"

	"github.com/LouisHatton/MUD-UI/internal/osmud"
	"go.uber.org/zap"
)

type OsMudReader struct {
	l  *zap.Logger
	db *sql.DB
}

var _ osmud.Reader = &OsMudReader{}

func New(l *zap.Logger, db *sql.DB) *OsMudReader {
	return &OsMudReader{
		l:  l,
		db: db,
	}
}

func (r *OsMudReader) ReadAll() (*[]osmud.OSMudEntry, error) {
	rows, err := r.db.Query("SELECT mac_address, ip, mud_url, mud_loc, hostname FROM mudfiles")
	if err != nil {
		r.l.Error("error performing read all query", zap.Error(err))
		return nil, err
	}

	response := []osmud.OSMudEntry{}

	defer rows.Close()
	for rows.Next() {
		row := osmud.OSMudEntry{}
		err = rows.Scan(&row.MacAddress, &row.Ip, &row.MudUrl, &row.MudLocation, &row.Hostname)
		if err != nil {
			r.l.Error("error reading row", zap.Error(err))
			return nil, err
		}
		response = append(response, row)
	}
	err = rows.Err()
	if err != nil {
		r.l.Error("error reading rows", zap.Error(err))
		return nil, err
	}

	return &response, nil
}
