package event

import (
	"os"

	"github.com/LouisHatton/MUD-UI/internal/dhcp"
	"go.uber.org/zap"
)

type Manager struct {
	l        *zap.Logger
	filePath string
}

var _ dhcp.EventFileManager = &Manager{}

func New(l *zap.Logger, filePath string) *Manager {
	return &Manager{
		l:        l.With(zap.String("filePath", filePath)),
		filePath: filePath,
	}
}

func (m *Manager) AddEvent(event *dhcp.Event) error {
	f, err := os.OpenFile(m.filePath, os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		m.l.Error("encountered error attempting to open file", zap.Error(err))
		return err
	}

	defer f.Close()

	if _, err = f.WriteString(event.String()); err != nil {
		m.l.Error("encountered error attempting write to file", zap.Error(err))
		return err
	}

	return nil
}
