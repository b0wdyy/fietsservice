import { Button } from "@/components/ui/button";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Fietsservice Lommel" },
        { name: "description", content: "Genereer je factuur" },
    ];
};

export default function Index() {
    return (
        <div className="w-screen h-screen grid place-items-center">
            <Button asChild>
                <Link to="/new">Factuur maken</Link>
            </Button>
        </div>
    );
}
