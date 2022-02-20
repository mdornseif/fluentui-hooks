# fluentui-hooks

Helpful State Managements for Dialogs, Panels, etc in fluent-ui.

## Plain fluent-ui components

### useTitle

Helpfully if you use a router and want to change the page title depending on what is displayed.

```js
import { useTitle } from 'fluentui-hooks'

function SomeComponent(props) {
    useTitle('Page title when this component is rendered')
    return <div>My Component</div>
}
```

### useDialog

Handles Dialog opening and closing.

```js
import { useDialog } from 'fluentui-hooks'
import { DialogFooter } from '@fluentui/react/lib/Dialog'
import { Separator } from '@fluentui/react/lib/Separator'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button'

export const SomeComponent = () => {
  const [openPdfDialog, pdfDialogProps, , dismissDialog] = useDialog(
    'Dialog Title',
    'Please do something.'
  )

  return <div>
      Other Stuff
      <Dialog {...props.pdfDialogProps}>
          Dialog Content
          <Separator></Separator>
          <DialogFooter>
            <PrimaryButton onClick={dismissDialog} text="Do it" />
            <DefaultButton onClick={dismissDialog} text="Cancel" />
          </DialogFooter>
      </Dialog>
    </div>
}
```

### usePanel

Handles Panel opening and closing.

```js
import { usePanel } from 'fluentui-hooks'
import { ActionButton, PrimaryButton } from '@fluentui/react/lib/Button'

export const SomeComponent = () => {
  const [openEditPanel, editPanelProps, , dismissEditPanel] = usePanel('Edit User')

  return <div>
      <ActionButton iconProps={{ iconName: 'Edit' }} ariaLabel="Edit" onClick={openEditPanel} />
      <Panel {...editPanelProps} type={PanelType.medium}>
        Panel Content
      </Panel>
    </div>
}   
```


## integration of wouter 

The following components use [wouter](https://github.com/molefrog/wouter) for URL manipulation.

### WithSidebar

Actually not a hook. Allows you to select which component is displayed from a vertical [navigation pane (Nav)](https://developer.microsoft.com/en-us/fluentui#/controls/web/nav).



```js
export const SomeComponent = () => {
 const sidebar: ISidebarProps = {
    SomeName: {
      links: [
        {
          title: 'Greeting',
          path: '/greeting',
          component: <div>Welcome Eathlings!</div>,
        },
        {
          title: 'Goodbye',
          path: '/goodbye',
          component: <div>TBD</div>,
        },
      ],
    },
  }
  
  return (
    <WithSidebar items={sidebar}>
      <div>Content to be shown if nothing is selected.</div>
    </WithSidebar>
  )
}
```