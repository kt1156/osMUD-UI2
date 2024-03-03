package main

import (
	"net/http"

	"github.com/LouisHatton/MUD-UI/internal/osmud"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"go.uber.org/zap"
)

type API struct {
	l           *zap.Logger
	r           chi.Router
	osMudReader osmud.Reader
}

func NewServer(logger *zap.Logger, osMudReader osmud.Reader) *API {
	return &API{
		l:           logger,
		osMudReader: osMudReader,
	}
}

func (api *API) Start(port string) error {
	api.r = chi.NewRouter()
	api.r.Use(middleware.Logger)
	api.registerRoutes()

	api.l.Info("Server started", zap.String("port", port))
	http.ListenAndServe(":"+port, api.r)
	return nil
}

func (api *API) registerRoutes() {
	api.r.Get("/health", api.healthcheck)
	api.r.Get("/osmud", api.GetAllOsMudEntries)
	api.r.Get("/osmud/{macAddress}", api.GetOsMudEntry)
	api.r.Get("/osmud/{macAddress}/mud", api.GetMudFileForDevice)
}
