import type { Section } from '../types'

export const deletion: Section = {
  id: 'deletion',
  title: 'Deletion lineage and limits of model unlearning',
  scene: 'deletion',
  focus: 'trace',
  slide: `## Deleting data, and what remains

A deletion request can be traced through **lineage** to every copy. Deleting the rows does **not** remove their influence on trained models.

### One request, traced
- Warehouse: 14 orders deleted, 12 May
- Online features: the customer's row deleted
- Prediction logs: 31 events deleted, 13 May
- Training snapshots: **3** found by lineage, rewritten by 20 May
- Models v12 and v14: trained on those snapshots

### For the trained models
- **Retrain** without the rows: the June retrain
- "Unlearning" methods are approximate: a **specialist** question
- **Record** which models still carry the influence, and until when

### Why lineage matters
- Without it, the snapshots and models could not be **found**`,
  narration:
    "When a customer asks for their data to be deleted, lineage is what makes the request answerable, because it shows every place that data was copied to. Deleting the rows, though, does not remove their influence on models already trained. Trace one request. On the twelfth of May the customer's fourteen orders are deleted from the warehouse, and their row in the online feature store is removed. On the thirteenth, thirty-one prediction events are deleted from the logs, found by the hashed key. Lineage then shows that the customer's orders appear in three training snapshots, which are rewritten without them by the twentieth. And lineage shows that models version twelve and version fourteen were trained on those snapshots. Those models still carry a small influence from this customer's data. Deleting the source rows cannot reach inside a fitted model. The practical options are to retrain without the deleted rows, which here happens at the June retrain. Methods that claim to make a model unlearn specific examples exist, but they are approximate and need specialist review. Either way, record which models still carry the influence, and until when. None of this would be possible without lineage: the snapshots and models trained on the deleted data could not even be found.",
}
