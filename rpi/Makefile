MKDIR   := mkdir
RMDIR   := rm -rf
CC      := cc
BIN     := ./bin
OBJ     := ./obj
INCLUDE := ./include
SRC     := ./src
SRCS    := $(wildcard $(SRC)/*.c)
OBJS    := $(patsubst $(SRC)/%.c,$(OBJ)/%.o,$(SRCS))
EXE     := $(BIN)/rpi
CFLAGS  := $(shell pkg-config --cflags raylib) -I$(INCLUDE)
LDFLAGS := $(shell pkg-config --libs raylib)

.PHONY: all run clean

all: $(EXE)

$(EXE): $(OBJS)
	$(MKDIR) -p $(BIN)
	$(CC) -o $@ $^ $(LDFLAGS)

$(OBJ)/%.o: $(SRC)/%.c
	$(MKDIR) -p $(OBJ)
	$(CC) -c -o $@ $< $(CFLAGS)

run: $(EXE)
	$<

clean:
	$(RMDIR) $(BIN) $(OBJ)