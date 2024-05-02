import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'

export default function DashboardConfig() {
    return (
        <div>
            <h2 className="text-2xl font-bold">Config</h2>

            <Separator className="my-2" />

            <p className="mt-4 text-zinc-400">
                Hier kan je verschillende instellingen aanpassen zoals welke type fietsen je hebt,
                welke merken van fietsen je hebt, ...
            </p>

            <Tabs defaultValue="bikeTypes" className="mt-6">
                <TabsList className="mb-2 flex gap-8">
                    <TabsTrigger
                        className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        value="bikeTypes"
                    >
                        Fiets types
                    </TabsTrigger>
                    <TabsTrigger
                        className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        value="bikeBrands"
                    >
                        Fiets merken
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="bikeTypes">
                    {/* Create component for biketypes */}
                    Bike types
                </TabsContent>

                <TabsContent value="bikeBrands">
                    {/* Create component for bike brands */}
                    Bike brands
                </TabsContent>
            </Tabs>
        </div>
    )
}
