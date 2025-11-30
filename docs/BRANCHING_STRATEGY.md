# Estrategia de Branching - Embudo IA Express

## Ramas principales

- **`main`**: Rama estable oficial de la plantilla. Código listo para producción.
- **`genspark_ai_developer`**: Rama de trabajo activa. Nuevos desarrollos y experimentos.
- **`template-v1`**: Rama de referencia para Plantilla Base v1 (apunta a tag `v1.0.0-template`).

## Tags

- **`v1.0.0-template`**: Versión congelada de la Plantilla Base v1. Incluye Next.js 15, validación Zod, componentes core y build config optimizado.

## Flujo de trabajo

1. **Nuevas features/fixes**: Crear rama desde `main` con prefijo `feat/` o `fix/`
2. **Pull Requests**: Todas las ramas deben entrar por PR hacia `main`
3. **Merge a main**: Solo hacer merge después de review y testing
4. **Sincronización**: Mantener `genspark_ai_developer` actualizada con `main` cuando sea necesario

## Ramas eliminadas

Las siguientes ramas fueron usadas solo para PR específicos y ya fueron eliminadas:
- `fix/relax-build-rules` → PR #2 (mergeado)
- `fix/config-validation-errors` → PR #3 (mergeado)

---

**Última actualización**: 2024-11-30  
**Responsable**: DevOps Team
