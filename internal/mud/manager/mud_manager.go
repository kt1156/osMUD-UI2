package manager

import (
	"database/sql"
	"time"

	"github.com/LouisHatton/MUD-UI/internal/mud"
	"go.uber.org/zap"
)

type MudManager struct {
	l  *zap.Logger
	db *sql.DB
}

var _ mud.Manager = &MudManager{}

func New(l *zap.Logger, db *sql.DB) *MudManager {
	return &MudManager{
		l:  l,
		db: db,
	}
}

func (m *MudManager) Get(macAddress string) ([]byte, error) {
	rows, err := m.db.Query("SELECT mac_address, updated_at, mud_file FROM manager WHERE mac_address = ?", macAddress)
	if err != nil {
		m.l.Error("error performing read all query", zap.Error(err))
		return nil, err
	}

	var response *mud.MudManagerEntry

	defer rows.Close()
	for rows.Next() {
		response = &mud.MudManagerEntry{}
		var secs int64
		err = rows.Scan(&response.MacAddress, &secs, &response.MudFile)
		response.UpdatedAt = time.Unix(secs, 0)
		if err != nil {
			m.l.Error("error reading row", zap.Error(err))
			return nil, err
		}
	}
	err = rows.Err()
	if err != nil {
		m.l.Error("error reading rows", zap.Error(err))
		return nil, err
	}

	return response.MudFile, nil
}

func (m *MudManager) Set(macAddress string, mudFile []byte) error {
	now := time.Now().Unix()
	_, err := m.db.Exec("INSERT or REPLACE INTO manager (mac_address, updated_at, mud_file) VALUES (?, ?, ?)", macAddress, now, mudFile)
	if err != nil {
		m.l.Error("error performing update query", zap.Error(err))
		return err
	}

	return nil
}
