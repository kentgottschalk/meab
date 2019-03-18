# Middle Earth Army Builder

Middle Earth Army Builder, but mostly a software development project!

## start graphql server

postgraphile -c postgres://postgres:PASSWORD@localhost:5432/postgres -s armydata -a -j --cors

### graphql query


{
  factions: allFactions {
    nodes {
      fid
      name
      side
      allies: factionRelationsByFaction1Id {
        nodes {
          fid: faction2Id
          factionByFaction2Id {   
              name   
          }
          relation
        }
      }
    }
  }
  allUnits {
    nodes {
      uid
      name
      unitType
      heroicTierByHeroicTier {
        name
        warriors
      } 
      points
      unitFactionRelationsByUnitId {
        nodes {
          factionId
        }
      }
      unitOptionRelationsByUnitId {
        nodes {
          optionByOptionId {
            name
            points: pointHero #@include(if: unitType)
            pointWarrior
          }
        }
      }
    }
  }
}