package DbManager

import (
	"database/sql"

	"github.com/LouisHatton/MUD-UI/internal/db"
	_ "github.com/mattn/go-sqlite3"

	"go.uber.org/zap"
)

type DbManager struct {
	l         *zap.Logger
	dbFileLoc string
	db        *sql.DB
}

var _ db.Manager = &DbManager{}

func NewDbManager(l *zap.Logger, dbFileLoc string) *DbManager {
	return &DbManager{
		l:         l,
		dbFileLoc: dbFileLoc,
		db:        nil,
	}
}

func (m *DbManager) GetDatabase() (*sql.DB, error) {
	if m.db != nil {
		return m.db, nil
	}

	db, err := sql.Open("sqlite3", m.dbFileLoc)
	if err != nil {
		m.l.Error("error opening sqlite database", zap.Error(err))
		return nil, err
	}

	m.db = db
	return m.db, nil
}

func (m *DbManager) Close() error {
	if m.db != nil {
		return m.db.Close()
	}
	return nil
}
