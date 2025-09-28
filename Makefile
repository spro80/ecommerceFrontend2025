.PHONY: build zip clean all

build:
	npm run build
	mv dist build

zip:
	if [ -d build ]; then cd build && zip -r ../build.zip ./*; else echo "Error: carpeta build no existe"; exit 1; fi

clean:
	rm -rf build.zip
	rm -rf build
	rm -rf dist

all: clean build zip
