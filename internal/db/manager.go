package db

import (
	"database/sql"
)

type Manager interface {
	GetDatabase() (*sql.DB, error)
	Close() error
}
