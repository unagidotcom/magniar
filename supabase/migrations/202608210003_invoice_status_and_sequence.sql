alter table public.invoices
drop constraint if exists invoices_status_check;

alter table public.invoices
add constraint invoices_status_check
check (status in ('DRAFT', 'SENT', 'UNPAID', 'PAID', 'OVERDUE', 'VOID', 'ARCHIVED'));

do $$
declare
  max_invoice_number bigint;
begin
  select coalesce(max((regexp_match(invoice_number, '^MG-INV-[0-9]{4}-([0-9]{6})$'))[1]::bigint), 0)
  into max_invoice_number
  from public.invoices
  where invoice_number ~ '^MG-INV-[0-9]{4}-[0-9]{6}$';

  if max_invoice_number = 0 then
    perform setval('public.invoice_number_seq', 1, false);
  else
    perform setval('public.invoice_number_seq', max_invoice_number, true);
  end if;
end;
$$;
