# API Inventario

Esta API sencilla maneja el inventario de una tienda de vinilos.

## Operaciones CRUD

```
[GET] Obtiene todos los albums
http://localhost:3000/albums
```

```
[GET] Obtiene un album por ID
http://localhost:3000/albums/:id
```

```
[POST] Crea un nuevo album
http://localhost:3000/albums
```

```
[PUT] Actualiza un album por ID
http://localhost:3000/albums/:id
```

```
[DELETE] Elimina un album por ID
http://localhost:3000/albums/:id
```

## Lógica de negocios

```
[GET] Obtiene los albums de acuerdo a los filtros de búsqueda
http://localhost:3000/albums/catalog/search
```

```
[PUT] Actualiza el stock al comprar un album
http://localhost:3000/albums/:id/buy
```

```
[PUT] Actualiza el stock al devolver un album
http://localhost:3000/albums/:id/return
```
