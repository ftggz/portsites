import { createCn } from "cn/engine";

import tables from "./cn-tables";

// As tabelas saem do @theme de globals.css (npm run cn:tables). Sem elas, text-body e
// text-foreground seriam lidos como duas cores, e o tamanho sumiria da lista de classes.
export const cn = createCn(tables);
