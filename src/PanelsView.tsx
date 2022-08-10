import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  BoxProps,
} from '@chakra-ui/react';
import React from 'react';
import { EditorPanel } from './EditorPanel';
import { ResizableBox } from './ResizableBox';
import { useSimulation } from './SimulationContext';
import { useSourceActor } from './sourceMachine';

export const PanelsView = (props: BoxProps) => {
  const simService = useSimulation();
  const [sourceState, sendToSourceService] = useSourceActor();

  return (
    <ResizableBox
      {...props}
      gridArea="panels"
      minHeight={0}
      data-testid="panels-view"
    >
      <Tabs
        bg="gray.800"
        display="grid"
        gridTemplateRows="3rem 1fr"
        height="100%"
      >
        <TabList>
        </TabList>

        <TabPanels minHeight={0}>
          <TabPanel height="100%" padding={0}>

            <EditorPanel
              onChangedCodeValue={(code) => {
                sendToSourceService({
                  type: 'CODE_UPDATED',
                  code,
                  sourceID: sourceState.context.sourceID,
                });
              }}
              onChange={(machines) => {
                simService.send({
                  type: 'MACHINES.REGISTER',
                  machines,
                });
              }}
            />

          </TabPanel>
        </TabPanels>
      </Tabs>
    </ResizableBox>
  );
};
